export default class ColumnDefDto {
    headerName
    headerClass
    field
    type
    valueGetter
    valueFormatter
    valueSetter
    keyCreator
    sortable
    initialSort
    filter
    checkboxSelection
    headerCheckboxSelection
    initialHide
    width
    flex
    lockPosition
    pinned
    resizable
    editable
    cellClass
    cellRenderer
    cellEditor
    cellEditorPopup
    cellEditorParams
    suppressSizeToFit

    constructor(data) {
        this.headerName = data.headerName ?? undefined
        this.headerClass = data.headerClass ?? undefined
        this.field = data.field ?? undefined
        this.type = data.type ?? undefined
        this.valueGetter = data.valueGetter ?? undefined
        this.valueFormatter = data.valueFormatter ?? undefined
        this.valueSetter = data.valueSetter ?? undefined
        this.keyCreator = data.keyCreator ?? undefined
        this.sortable = data.sortable ?? undefined
        this.initialSort = data.initialSort ?? undefined
        this.filter = data.filter ?? undefined
        this.checkboxSelection = data.checkboxSelection ?? undefined
        this.headerCheckboxSelection = data.headerCheckboxSelection ?? undefined
        this.initialHide = data.initialHide ?? undefined
        this.width = data.width ?? undefined
        this.flex = data.flex ?? undefined
        this.lockPosition = data.lockPosition ?? undefined
        this.pinned = data.pinned ?? undefined
        this.resizable = data.resizable ?? undefined
        this.editable = data.editable ?? undefined
        this.cellClass = data.cellClass ?? undefined
        this.cellRenderer = data.cellRenderer ?? undefined
        this.cellEditor = data.cellEditor ?? undefined
        this.cellEditorPopup = data.cellEditorPopup ?? undefined
        this.cellEditorParams = data.cellEditorParams ?? undefined
        this.suppressSizeToFit = data.suppressSizeToFit ?? undefined
    }
}
