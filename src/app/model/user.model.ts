export class User {

    public firstName!: string;
    public lastName!: string;
    public username!: string;
    public userId!: string;
    public status!: string;
    public dateCreated!: any;
    public roles!: string[];

    constructor(data: any) {
        Object.assign(this, data);
    }

    public hasPermission(permissionName: string) {
        return this.roles.filter((it: string) => it === permissionName).length;
    }

    public isLibrarian(): boolean {
        const librarianRoles = ['MODIFY_BOOKS', 'CREATE_BOOKS'];
        return this.roles.some((it: string) => librarianRoles.indexOf(it) >= 0);
    }
}
