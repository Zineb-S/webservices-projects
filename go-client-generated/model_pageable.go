/*
 * OpenAPI definition
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: v0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type Pageable struct {
	Page int32 `json:"page,omitempty"`
	Size int32 `json:"size,omitempty"`
	Sort []string `json:"sort,omitempty"`
}
