import { CreateCategoryDto } from "src/core/dto/category/category.create.dto";
import { UpdateCategoryDto } from "src/core/dto/category/category.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Category } from "src/db/entities/Category";
import { CategoryService } from "src/services/category.service";
export declare class CategoryController {
    private readonly staffAccessService;
    constructor(staffAccessService: CategoryService);
    getDetails(categoryId: string): Promise<ApiResponseModel<Category>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Category[];
        total: number;
    }>>;
    create(accessDto: CreateCategoryDto): Promise<ApiResponseModel<Category>>;
    update(categoryId: string, dto: UpdateCategoryDto): Promise<ApiResponseModel<Category>>;
    delete(categoryId: string): Promise<ApiResponseModel<Category>>;
}
