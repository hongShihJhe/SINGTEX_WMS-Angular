export enum ContainerValidatorCodes {
    /**
     * 資料不存在
     */
    D000 = 'D000',

    /**
     * 資料已存在
     */
    D001 = 'D001',

    /**
     * container_type or container_no is null or whitespace
     */
    M000 = 'M000',

    /** 
     * 'the length of container_type exceeds 1'
    */
    M001 = 'M001',

    /**
     * the length of container_no must be 3
     */
    M002 = 'M002',

    /**
     * container_no can be only number 0-9
     */
    M003 = 'M003',

    /**
     * the length of memo exceeds 50
     */
    M004 = 'M004',
}