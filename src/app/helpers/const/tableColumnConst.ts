import { TableActionColumn } from "../enums/tableColumnEnum";

export const TableColumnContants = {
    actionColumn(actions: TableActionColumn = TableActionColumn.ViewEditDelete) {
        return {
            title: '',
            render: function (data: any, type: any, record: any) {
                let viewIcon = `<span role="button" class="me-1"><mat-icons view-item="${record.id}" class="material-icons text-primary">visibility</mat-icon></span>`
                let editIcon = `<span role="button" class="me-1"><mat-icons edit-item="${record.id}" class="material-icons text-success">edit</mat-icon></span>`
                let deleteIcon = `<span role="button" class="me-1"><mat-icons delete-item="${record.id}" class="material-icons text-danger">delete</mat-icon></span>`
              
                let icons = "";
                switch (actions) {
                    case TableActionColumn.View:
                        icons = `${viewIcon}`;
                        break;
                    case TableActionColumn.Edit:
                        icons = `${editIcon}`;
                        break;
                    case TableActionColumn.Delete:
                        icons = `${deleteIcon}`;
                        break;
                    case TableActionColumn.ViewEdit:
                        icons = `${viewIcon}${editIcon}`;
                        break;
                    case TableActionColumn.ViewDelete:
                        icons = `${viewIcon}${deleteIcon}`;
                        break;
                    case TableActionColumn.EditDelete:
                        icons = `${editIcon}${deleteIcon}`;
                        break;
                    case TableActionColumn.ViewEditDelete:
                        icons = `${viewIcon}${editIcon}${deleteIcon}`;
                        break;
                } 
                return icons;
            }
          }
    }
}