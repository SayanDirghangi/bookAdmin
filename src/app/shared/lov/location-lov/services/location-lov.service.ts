import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Location } from '../models/location.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationLovService {
  private locationData: Location[] | null = null;
  private readonly locationDataUrl = 'assets/json/locationLov.json';

  constructor(private http: HttpClient) {}

  searchLocationData(inputData?: Partial<Location>): Observable<Location[]> {
    const stateFilter = (inputData?.state ?? '').trim().toLowerCase();
    const areaFilter = (inputData?.area ?? '').trim().toLowerCase();

    if (this.locationData) {
      return of(this.filterLocationData(this.locationData, stateFilter, areaFilter));
    }

    return this.http.get<Location[]>(this.locationDataUrl).pipe(
      map((data) => {
        this.locationData = data;
        return this.filterLocationData(data, stateFilter, areaFilter);
      }),
      catchError(() => of([]))
    );
  }

  sortLocationData(
    locationData: Location[],
    orderByProperty: keyof Location = 'state',
    ascendingOrder = true
  ): Location[] {
    const sortedData = [...locationData].sort((first, second) => {
      return first[orderByProperty].localeCompare(second[orderByProperty]);
    });

    return ascendingOrder ? sortedData : sortedData.reverse();
  }

  private filterLocationData(
    locationData: Location[],
    stateFilter: string,
    areaFilter: string
  ): Location[] {
    return locationData.filter((location) => {
      const stateMatch =
        !stateFilter || location.state.toLowerCase().includes(stateFilter);
      const areaMatch =
        !areaFilter || location.area.toLowerCase().includes(areaFilter);

      return stateMatch && areaMatch;
    });
  }
}
