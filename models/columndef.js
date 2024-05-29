export default class ColumnDef {
    constructor(data) {
        this.id = data?.id
        this.columnOrder = data?.columnOrder
        this.tableName = data?.tableName
        this.headerName = data?.headerName
        this.headerClass = data?.headerClass
        this.field = data?.field
        this.type = data?.type
        this.valueGetter = data?.valueGetter
        this.valueFormatter = data?.valueFormatter
        this.valueSetter = data?.valueSetter
        this.keyCreator = data?.keyCreator
        this.sortable = data?.sortable
        this.initialSort = data?.initialSort
        this.filter = data?.filter
        this.checkboxSelection = data?.checkboxSelection
        this.headerCheckboxSelection = data?.headerCheckboxSelection
        this.initialHide = data?.initialHide
        this.width = data?.width
        this.flex = data?.flex
        this.lockPosition = data?.lockPosition
        this.pinned = data?.pinned
        this.resizable = data?.resizable
        this.editable = data?.editable
        this.cellClass = data?.cellClass
        this.cellRenderer = data?.cellRenderer
        this.cellEditor = data?.cellEditor
        this.cellEditorPopup = data?.cellEditorPopup
        this.cellEditorParams = data?.cellEditorParams
        this.suppressSizeToFit = data?.suppressSizeToFit
        this.suppressAutoSize = data?.suppressAutoSize
        this.suppressNavigable = data?.suppressNavigable
        this.control = data?.control
        this.ignore = data?.ignore
        this.dateCreated = data?.dateCreated
        this.createdByUserId = data?.createdByUserId
        this.dateModified = data?.dateModified
        this.modifiedByUserId = data?.modifiedByUserId
    }
}
