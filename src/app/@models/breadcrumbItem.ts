export class breadcrumbItem{
    url?:string
    name?:string
    current = false

    constructor(url:string, name:string){
        this.url = url
        this.name = name
    }
}