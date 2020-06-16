import { SortOrder } from 'src/app/app.constants';

export interface Sort {
    field: string,
    order?: SortOrder
}