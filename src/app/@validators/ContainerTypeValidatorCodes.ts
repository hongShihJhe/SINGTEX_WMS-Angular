export enum ContainerTypeValidatorCodes {
    /**
     * 資料不存在
     */
    D000 = 'D000',

    /**
     * 資料已存在
     */
    D001 = 'D001',

    /**
     * container_type or container_type_name is null or whitespace
     */
    M000 = 'M000',

    /** 
     * 'the length of container_type exceeds 1'
    */
    M001 = 'M001',

    /**
     * the length of container_type_name exceeds 10
     */
    M002 = 'M002',

    /**the length of memo exceeds 50
     * 
     */
    M003 = 'M003'
}