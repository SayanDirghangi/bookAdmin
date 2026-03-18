import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import lovConfig from '../../lov-config/lov-config.json';
import { Location } from '../models/location.model';
import { LocationLovService } from '../services/location-lov.service';

interface LovGridColumn {
  displayName: string;
  field: keyof Location;
}

interface LovConfiguration {
  ascendingOrder: boolean;
  configId: string;
  lovGrid: LovGridColumn[];
  lovTitle: string;
  orderby: keyof Location;
}

@Component({
  standalone: true,
  selector: 'app-location-lov',
  templateUrl: './location-lov.component.html',
  styleUrls: ['./location-lov.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationLovComponent implements OnInit, AfterViewInit {
  readonly stateFilter = new FormControl('', { nonNullable: true });
  readonly areaFilter = new FormControl('', { nonNullable: true });

  filterValues = {
    area: '',
    state: ''
  };

  dataSource = new MatTableDataSource<Location>([]);
  defaultData: Location[] = [];
  displayColumns: Array<keyof Location> = ['state', 'area'];
  locationConfig: LovConfiguration | null = null;
  selectedRow: Location | null = null;
  sortState: {
    active: keyof Location | null;
    direction: 'asc' | 'desc' | '';
  } = {
    active: null,
    direction: ''
  };
  title = 'Location';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly locationLovService: LocationLovService,
    private readonly liveAnnouncer: LiveAnnouncer,
    @Optional()
    private readonly dialogRef: MatDialogRef<LocationLovComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private readonly data: unknown
  ) {}

  ngOnInit(): void {
    this.initializeConfig();

    this.dataSource.filterPredicate = this.createFilter();

    this.locationLovService.searchLocationData().subscribe((locations) => {
      this.defaultData = [...locations];
      this.dataSource.data = [...locations];
    });

    this.stateFilter.valueChanges.subscribe((stateValue) => {
      this.filterValues.state = stateValue.trim().toLowerCase();
      this.applyFilter();
    });

    this.areaFilter.valueChanges.subscribe((areaValue) => {
      this.filterValues.area = areaValue.trim().toLowerCase();
      this.applyFilter();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  close(): void {
    this.dialogRef?.close({
      selectedData: this.selectedRow
    });
  }

  onSelectRow(data: Location): void {
    this.selectedRow = data;
    this.close();
  }

  getSortIcon(column: keyof Location): 'north' | 'south' | 'swap_vert' {
    if (this.sortState.active !== column || this.sortState.direction === '') {
      return 'swap_vert';
    }

    return this.sortState.direction === 'asc' ? 'north' : 'south';
  }

  toggleSort(column: keyof Location): void {
    let nextDirection: 'asc' | 'desc' | '' = 'asc';
    let nextActive: keyof Location | null = column;

    if (this.sortState.active === column) {
      if (this.sortState.direction === 'asc') {
        nextDirection = 'desc';
      } else if (this.sortState.direction === 'desc') {
        nextDirection = '';
        nextActive = null;
      }
    }

    this.sortState = {
      active: nextActive,
      direction: nextDirection
    };

    if (this.sortState.active && this.sortState.direction) {
      this.dataSource.data = this.locationLovService.sortLocationData(
        this.defaultData,
        this.sortState.active,
        this.sortState.direction === 'asc'
      );
    } else {
      this.dataSource.data = [...this.defaultData];
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    if (this.sortState.active && this.sortState.direction) {
      this.liveAnnouncer.announce(
        `Sorted by ${this.sortState.active} ${this.sortState.direction}ending`
      );
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  private applyFilter(): void {
    this.dataSource.filter = JSON.stringify(this.filterValues);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private createFilter(): (data: Location, filter: string) => boolean {
    return (data: Location, filter: string): boolean => {
      const searchTerms = JSON.parse(filter) as {
        area: string;
        state: string;
      };

      return (
        data.state.toLowerCase().includes(searchTerms.state) &&
        data.area.toLowerCase().includes(searchTerms.area)
      );
    };
  }

  private initializeConfig(): void {
    const allConfigs = lovConfig as LovConfiguration[];
    const requestedConfigId =
      (typeof this.data === 'string'
        ? this.data
        : (this.data as { configId?: string } | null)?.configId) ??
      'locationConfig';

    this.locationConfig =
      allConfigs.find((config) => config.configId === requestedConfigId) ??
      allConfigs[0] ??
      null;

    this.title = this.locationConfig?.lovTitle ?? 'Location';
    this.displayColumns = this.locationConfig?.lovGrid?.map(
      (column) => column.field
    ) ?? ['state', 'area'];
  }
}
