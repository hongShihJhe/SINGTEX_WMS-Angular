export class breadcrumb_item{
    url?:string
    name?:string
    current = false

    constructor(url:string, name:string){
        this.url = url
        this.name = name
    }
}