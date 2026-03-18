import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BookadminService } from 'src/app/features/bookadmin.service';
import { LocationLovComponent } from 'src/app/shared/lov/location-lov/components/location-lov.component';
import { finalize, of, type Observable } from 'rxjs';
import { IMaskModule } from 'angular-imask';
import { InputMaskRegexService } from 'src/app/shared/input-mask-regex/input-mask-regex.service';
import { Location } from 'src/app/shared/lov/location-lov/models/location.model';
import { CodeMasterFetchService } from 'src/app/shared/code-master/services/code-master-fetch.service';
import { ICodeMasterVal } from 'src/app/models/code-master/code-master.model';
import { BookAdminStore } from '../../feature-store/book-admin.store';

interface TaskUser {
  name: string;
  role?: string;
  userId: string;
}

interface TaskDetail {
  assignedTo: TaskUser;
  createdAt: string;
  createdBy: TaskUser;
  dashboardVisible: boolean;
  description: string;
  dueDate: string;
  module: string;
  priority: string;
  status: string;
  taskId: string;
  title: string;
}

type TaskDetailResponse = TaskDetail | TaskDetail[];

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    IMaskModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  accessResponses: Observable<{ writeAccess: boolean }> = of({
    writeAccess: true
  });
  allTasks: TaskDetail[] = [];
  errorMessage = '';
  isClosed = false;
  isLoading = false;
  pageEvent: { pageIndex: number; pageSize: number } | null = null;
  previousIndex = 0;
  searchForm!: UntypedFormGroup;
  taskDetails: TaskDetail[] = [];
  statusOptions$: Observable<ICodeMasterVal[]> = of([]);
  priorityOptions$: Observable<ICodeMasterVal[]> = of([]);
  locationLovDialog:
    | MatDialogRef<
        LocationLovComponent,
        { selectedData: Location | null } | undefined
      >
    | undefined;
  alphaNumericMask = {
    mask: this.inputMaskRegexService.alphaNumericMaskFunc.bind(
      this.inputMaskRegexService
    )
  };
   alphaMask = {
    mask: this.inputMaskRegexService.alphaMaskFunc.bind(
      this.inputMaskRegexService
    )
  };

  constructor(
    private fb: FormBuilder,
    private dialogModel: MatDialog,
    private bookAdminService: BookadminService,
    private inputMaskRegexService: InputMaskRegexService,
    public codeMaster:CodeMasterFetchService,
    private bookAdminStore: BookAdminStore
  ) {}

  ngOnInit(): void {
    
    this.bookAdminStore.historySerach$.subscribe((res) => {
      console.log('History Search from Store:', res);   
    });

    this.statusOptions$ = this.codeMaster.getCodeOptions('TASK_STATUS');
    this.priorityOptions$ = this.codeMaster.getCodeOptions('TASK_PRIORITY');

    this.searchForm = this.fb.group({
      customClearance: [''],
      priority: [''],
      documentNum: ['', [Validators.maxLength(40)]],
      documentPrfx: ['', [Validators.maxLength(30)]]
    });

    this.fetchTaskDetails();
  }

  agentLov(): void {}

  clear(): void {
    this.searchForm.reset({
      customClearance: '',
      priority: '',
      documentNum: '',
      documentPrfx: ''
    });
    this.fetchTaskDetails();
  }

  closePanel(): void {
    this.isClosed = true;
  }

  getStatusClass(status: string): string {
    const normalizedStatus = status.toUpperCase();
    if (normalizedStatus === 'COMPLETED') {
      return 'status-completed';
    }
    if (normalizedStatus === 'IN_PROGRESS') {
      return 'status-in-progress';
    }
    if (normalizedStatus === 'REJECTED') {
      return 'status-rejected';
    }
    return 'status-pending';
  }

  hawbUpdate(event: Event, index: number): void {
    event.stopPropagation();
    this.previousIndex = index;
  }

  moveToNextInput(
    event: KeyboardEvent,
    _from: HTMLInputElement,
    _current: HTMLInputElement,
    next?: HTMLInputElement | null
  ): void {
    if (event.key === 'Enter' && next) {
      next.focus();
      event.preventDefault();
    }
  }

  onFocusOut(): void {}

  onFocusOutNumbers(event: Event, _input: HTMLInputElement): void {
    event.preventDefault();
  }

  openHawb(index: number): void {
    this.previousIndex = index;
  }

  openPanel(): void {
    this.isClosed = false;
  }

  refresh(_index: number): void {
    this.fetchTaskDetails();
  }

  search(): void {
    this.fetchTaskDetails();
  }

  private applyFilters(): void {
    const formValue = this.searchForm.getRawValue();
    this.bookAdminStore.setHistorySearch(formValue);
    console.log('Form Value:', formValue);
    
    const locationQuery = String(formValue.documentPrfx ?? '')
      .trim()
      .toLowerCase();
    const referenceQuery = String(formValue.documentNum ?? '')
      .trim()
      .toLowerCase();
    const statusQuery = String(formValue.customClearance ?? '')
      .trim()
      .toUpperCase();
    const priorityQuery = String(formValue.priority ?? '')
      .trim()
      .toUpperCase();
    const normalizedStatusQuery = statusQuery === 'ALL' ? '' : statusQuery;
    const normalizedPriorityQuery = priorityQuery === 'ALL' ? '' : priorityQuery;

    this.taskDetails = this.allTasks.filter((task) => {
      const moduleMatches =
        !locationQuery || task.module.toLowerCase().includes(locationQuery);
      const referenceMatches =
        !referenceQuery || task.taskId.toLowerCase().includes(referenceQuery);
      const statusMatches =
        !normalizedStatusQuery || task.status === normalizedStatusQuery;
      const priorityMatches =
        !normalizedPriorityQuery || task.priority === normalizedPriorityQuery;

      return (
        moduleMatches &&
        referenceMatches &&
        statusMatches &&
        priorityMatches
      );
    });
  }

  private fetchTaskDetails(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.bookAdminService
      .getTaskDetails()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response: TaskDetailResponse) => {
          this.allTasks = this.normalizeTaskResponse(response);
          this.applyFilters();
        },
        error: () => {
          this.allTasks = [];
          this.taskDetails = [];
          this.errorMessage = 'Unable to load task details from service.';
        }
      });
  }

  private normalizeTaskResponse(response: TaskDetailResponse): TaskDetail[] {
    const tasks = Array.isArray(response) ? response : [response];

    return tasks.map((task) => ({
      assignedTo: {
        name: task.assignedTo?.name ?? '',
        role: task.assignedTo?.role ?? '',
        userId: task.assignedTo?.userId ?? ''
      },
      createdAt: task.createdAt ?? '',
      createdBy: {
        name: task.createdBy?.name ?? '',
        role: task.createdBy?.role ?? '',
        userId: task.createdBy?.userId ?? ''
      },
      dashboardVisible: !!task.dashboardVisible,
      description: task.description ?? '',
      dueDate: task.dueDate ?? '',
      module: task.module ?? '',
      priority: (task.priority ?? '').toUpperCase(),
      status: (task.status ?? 'PENDING').toUpperCase(),
      taskId: task.taskId ?? '',
      title: task.title ?? ''
    }));
  }

  locationLov(): void {
    const state = this.searchForm.controls['documentPrfx'].value;

    this.locationLovDialog = this.dialogModel.open(LocationLovComponent, {
      width: '650px',
      height: 'auto',
      data: {
        configId: 'locationConfig',
        state: state ? String(state) : ''
      },
      panelClass: 'custom-modalbox'
    });

    this.searchForm.controls['documentPrfx'].setErrors(null);

    this.locationLovDialog.afterClosed().subscribe((res) => {
      const selectedState = res?.selectedData?.area;

      if (selectedState) {
        this.searchForm.controls['documentPrfx'].setValue(selectedState);

        const numberInput = document.getElementById('number') as
          | HTMLInputElement
          | null;
        numberInput?.focus();
      }
    });
  }
}
