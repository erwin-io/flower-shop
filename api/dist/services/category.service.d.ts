import { CreateCategoryDto } from "src/core/dto/category/category.create.dto";
import { UpdateCategoryDto } from "src/core/dto/category/category.update.dto";
import { Category } from "src/db/entities/Category";
import { Repository } from "typeorm";
export declare class CategoryService {
    private readonly categoryRepo;
    constructor(categoryRepo: Repository<Category>);
    getCategoryPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Category[];
        total: number;
    }>;
    getById(categoryId: any): Promise<Category>;
    create(dto: CreateCategoryDto): Promise<Category>;
    update(categoryId: any, dto: UpdateCategoryDto): Promise<Category>;
    delete(categoryId: any): Promise<Category>;
}
