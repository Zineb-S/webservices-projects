/*
 * OpenAPI definition
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: v0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type PageUser struct {
	TotalPages int32 `json:"totalPages,omitempty"`
	TotalElements int64 `json:"totalElements,omitempty"`
	Size int32 `json:"size,omitempty"`
	Content []User `json:"content,omitempty"`
	Number int32 `json:"number,omitempty"`
	Sort *SortObject `json:"sort,omitempty"`
	First bool `json:"first,omitempty"`
	Last bool `json:"last,omitempty"`
	NumberOfElements int32 `json:"numberOfElements,omitempty"`
	Pageable *PageableObject `json:"pageable,omitempty"`
	Empty bool `json:"empty,omitempty"`
}