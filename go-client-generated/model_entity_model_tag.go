/*
 * OpenAPI definition
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: v0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type EntityModelTag struct {
	TagId string `json:"tagId,omitempty"`
	TagName string `json:"tagName"`
	Links *map[string]Link `json:"_links,omitempty"`
}
