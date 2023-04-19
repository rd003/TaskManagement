import { Injectable } from "@angular/core";
import { DropDownValuesModel } from 'src/app/models/dropdown-values.model';

@Injectable({ providedIn: 'root' })
export class DropdownMenuService{

    getDueDateOptions(): DropDownValuesModel[] {
        const dueDateOptions: DropDownValuesModel[] = [
            {
                label: 'Today', value: () => {
                    const today = new Date();
                    return today.toISOString();
                }
            },
            {
                label: 'Tommorow',
                value: () => {
                    const date = new Date();
                    date.setDate(date.getDate() + 1);
                    return date.toISOString();;
                }
            },
            {
                label: 'Next Week',
                value: () => {
                    const date = new Date();
                    date.setDate(date.getDate() + 7);
                    return date.toISOString();;
                }
            },
            {
                label: 'Pick a date',
                value: () => {
                    return ""
                }
            },
        ];

        return dueDateOptions;
    }

    getRemindMeOptions(): DropDownValuesModel[] {
        const remindMeOptions: DropDownValuesModel[] = [
            {
                label: 'Later today',
                value: () => {
                    const currentDate = new Date();
                    const twoHoursLater = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
                    const endOfTheDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 45);
                    if (twoHoursLater > endOfTheDay) {
                        return endOfTheDay.toISOString();
                    }
                    else {
                        return twoHoursLater.toISOString();
                    }
                }
            },
            {
                label: 'Tommorow',
                value: () => {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + 1);
                    currentDate.setHours(10, 0, 0);
                    return currentDate.toISOString();
                }
            },
            {
                label: 'Next Week',
                value: () => {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + 7);
                    currentDate.setHours(10, 0, 0);
                    return currentDate.toISOString();
                }
            }
        ];

        return remindMeOptions;
    }

    getRepeatOptions(): DropDownValuesModel[] {
        const repeatOptions: DropDownValuesModel[] = [
            {
              label: 'Daily',
              value:()=>1
            },
            {
              label: 'Week Days',
              value:()=>2
            },
            {
              label: 'Weekly',
              value:()=>3
            },
            {
              label: 'Yearly',
              value:()=>4
            }
        ];
        
        return repeatOptions;
    }
}