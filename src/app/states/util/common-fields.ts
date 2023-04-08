import { HttpErrorResponse } from "@angular/common/http";

export interface CommonFields{
    loading: boolean,
    error: HttpErrorResponse|null
}