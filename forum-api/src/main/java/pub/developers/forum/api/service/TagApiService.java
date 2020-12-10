package pub.developers.forum.api.service;

import pub.developers.forum.api.model.PageRequestModel;
import pub.developers.forum.api.model.PageResponseModel;
import pub.developers.forum.api.model.ResultModel;
import pub.developers.forum.api.request.tag.TagCreateRequest;
import pub.developers.forum.api.response.tag.TagQueryResponse;
import pub.developers.forum.api.vo.PostsVO;

import java.util.List;
import java.util.Set;

/**
 * @author Qiangqiang.Bian
 * @create 20/7/30
 * @desc
 **/
public interface TagApiService {

    ResultModel create(TagCreateRequest request);

    ResultModel<TagQueryResponse> getByName(String name);

    ResultModel<List<TagQueryResponse>> queryAll();

    ResultModel<List<TagQueryResponse>> queryInIds(Set<Long> ids);

    ResultModel<PageResponseModel<PostsVO>> pagePosts(PageRequestModel<Long> pageRequestModel);

}
