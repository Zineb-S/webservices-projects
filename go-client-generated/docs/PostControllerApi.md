# {{classname}}

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreatePost**](PostControllerApi.md#CreatePost) | **Post** /api/v1/posts | 
[**DeletePost**](PostControllerApi.md#DeletePost) | **Delete** /api/v1/posts/{id} | 
[**GetAllPosts**](PostControllerApi.md#GetAllPosts) | **Get** /api/v1/posts | 
[**GetPostsByTag**](PostControllerApi.md#GetPostsByTag) | **Get** /api/v1/posts/tag/{tag} | 
[**GetPostsByUser**](PostControllerApi.md#GetPostsByUser) | **Get** /api/v1/posts/user/{userId} | 
[**GetSinglePost**](PostControllerApi.md#GetSinglePost) | **Get** /api/v1/posts/{id} | 
[**SearchPosts**](PostControllerApi.md#SearchPosts) | **Get** /api/v1/posts/search | 
[**UpdatePost**](PostControllerApi.md#UpdatePost) | **Put** /api/v1/posts/{id} | 

# **CreatePost**
> Post CreatePost(ctx, body)


### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **body** | [**Post**](Post.md)|  | 

### Return type

[**Post**](Post.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/vnd.myapi.v1+json, application/vnd.myapi.v1+xml

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **DeletePost**
> string DeletePost(ctx, id)


### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **id** | **string**|  | 

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.myapi.v1+json, application/vnd.myapi.v1+xml

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetAllPosts**
> PagedModelEntityModelPost GetAllPosts(ctx, pageable)


### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **pageable** | [**Pageable**](.md)|  | 

### Return type

[**PagedModelEntityModelPost**](PagedModelEntityModelPost.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.myapi.v1+json, application/vnd.myapi.v1+xml

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPostsByTag**
> CollectionModelEntityModelPost GetPostsByTag(ctx, tag, optional)


### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **tag** | **string**|  | 
 **optional** | ***PostControllerApiGetPostsByTagOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a PostControllerApiGetPostsByTagOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **page** | **optional.Int32**|  | [default to 0]
 **size** | **optional.Int32**|  | [default to 10]

### Return type

[**CollectionModelEntityModelPost**](CollectionModelEntityModelPost.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.myapi.v1+json, application/vnd.myapi.v1+xml

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPostsByUser**
> CollectionModelEntityModelPost GetPostsByUser(ctx, userId, optional)


### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **userId** | **string**|  | 
 **optional** | ***PostControllerApiGetPostsByUserOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a PostControllerApiGetPostsByUserOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **page** | **optional.Int32**|  | [default to 0]
 **size** | **optional.Int32**|  | [default to 10]

### Return type

[**CollectionModelEntityModelPost**](CollectionModelEntityModelPost.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.myapi.v1+json, application/vnd.myapi.v1+xml

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetSinglePost**
> Post GetSinglePost(ctx, id)


### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **id** | **string**|  | 

### Return type

[**Post**](Post.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.myapi.v1+json, application/vnd.myapi.v1+xml

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **SearchPosts**
> PagePost SearchPosts(ctx, query, pageable)


### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **query** | **string**|  | 
  **pageable** | [**Pageable**](.md)|  | 

### Return type

[**PagePost**](PagePost.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.myapi.v1+json, application/vnd.myapi.v1+xml

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **UpdatePost**
> Post UpdatePost(ctx, body, id)


### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **body** | [**Post**](Post.md)|  | 
  **id** | **string**|  | 

### Return type

[**Post**](Post.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/vnd.myapi.v1+json, application/vnd.myapi.v1+xml

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

