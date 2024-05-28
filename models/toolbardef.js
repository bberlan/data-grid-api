export default class ToolbarDef {
    constructor(data) {
        this.id = data?.id
        this.tool = data?.tool
        this.function = data?.function
        this.functionParams = data?.functionParams
        this.userDefined = data?.userDefined
        this.group = data?.group
        this.modal = data?.modal
        this.showOn = data?.showOn
        this.tab = data?.tab
        this.index = data?.index
        this.stay = data?.stay
        this.control = data?.control
        this.ignore = data?.ignore
        this.dateCreated = data?.dateCreated
        this.createdByUserId = data?.createdByUserId
        this.dateModified = data?.dateModified
        this.modifiedByUserId = data?.modifiedByUserId
    }
}
