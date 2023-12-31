/*
 * OpenAPI definition
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: v0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

type EntityModelPost struct {
	PostId string `json:"postId,omitempty"`
	PostText string `json:"postText"`
	PostImage string `json:"postImage,omitempty"`
	PostLikes int32 `json:"postLikes,omitempty"`
	PostLink string `json:"postLink,omitempty"`
	PostTags []string `json:"postTags,omitempty"`
	PostPublishDate string `json:"postPublishDate,omitempty"`
	PostOwnerId string `json:"postOwnerId"`
	Links *map[string]Link `json:"_links,omitempty"`
}
