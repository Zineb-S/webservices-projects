/*
 * OpenAPI definition
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: v0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type Link struct {
	Href string `json:"href,omitempty"`
	Hreflang string `json:"hreflang,omitempty"`
	Title string `json:"title,omitempty"`
	Type_ string `json:"type,omitempty"`
	Deprecation string `json:"deprecation,omitempty"`
	Profile string `json:"profile,omitempty"`
	Name string `json:"name,omitempty"`
	Templated bool `json:"templated,omitempty"`
}
