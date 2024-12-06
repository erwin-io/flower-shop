import { CreateCategoryDto } from "src/core/dto/category/category.create.dto";
import { UpdateCategoryDto } from "src/core/dto/category/category.update.dto";
import { Category } from "src/db/entities/Category";
import { Product } from "src/db/entities/Product";
import { Repository } from "typeorm";
export declare class CategoryService {
    private readonly categoryRepo;
    constructor(categoryRepo: Repository<Category>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: any[];
        total: number;
    }>;
    getById(categoryId: any): Promise<{
        productCount: number;
        categoryId: string;
        sequenceId: string;
        name: string;
        desc: string;
        active: boolean;
        thumbnailFile: import("../db/entities/File").File;
        products: Product[];
    }>;
    create(dto: CreateCategoryDto): Promise<Category>;
    update(categoryId: any, dto: UpdateCategoryDto): Promise<Category>;
    delete(categoryId: any): Promise<Category>;
}
