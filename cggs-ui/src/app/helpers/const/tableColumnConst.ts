export const TableColumnContants = {
    actions() {
        return {
            title: '',
            render: function (data: any, type: any, record: any) {
              return `
              <span><mat-icons view-item="${record.id}" fonticon="visibility" class="mat-icon material-icons mat-ligature-font"></mat-icon></span>
              <span><mat-icons edit-item="${record.id}" fonticon="edit" class="mat-icon material-icons mat-ligature-font"></mat-icon></span>
              <span><mat-icons delete-item="${record.id}" fonticon="delete" class="mat-icon material-icons mat-ligature-font"></mat-icon></span>
              `;
            }
          }
    }
}