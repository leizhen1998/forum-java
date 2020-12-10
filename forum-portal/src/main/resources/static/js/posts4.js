var commentInput = $('#postsCommentInput');
commentInput.focus(function () {
    if ($('#bodyNav')[0].dataset.islogin === 'false') {
        return;
    }
    commentInput.css('height', '70px');
    $('#postsCommentBtnBox').css('display','block');
});
commentInput.blur(function () {
    if (commentInput.val().length === 0) {
        commentInput.css('height', '35px');
        $('#postsCommentBtnBox').css('display','none');
    }
});

$('#postsCommentBtn').on('click', function () {
    if (!commentInput.val()) {
        toastr.error('评论内容不能为空');
        return;
    }
    comment(commentInput.val(), '');
});

var replyContent = $('#replyContent');
var replyBtn = $('#replyBtn');
$('.reply-comment').on('click', function (e) {
    $('#commentModalDropLabel').html('回复 ' + this.dataset.replyNickname);
    $('#repliedContent').html(this.dataset.replyContent);
    replyContent.attr('placeholder', '回复' + this.dataset.replyNickname);
    replyBtn.attr('data-reply-id', this.dataset.replyId);
});

replyBtn.on('click', function () {
    if (!replyContent.val()) {
        toastr.error('回复内容不能为空');
        return;
    }
    comment(replyContent.val(), replyBtn.attr('data-reply-id'));
});

$('.best-answer').on('click', function (e) {
    post('/faq-rest/solution', {
        faqId: $('#postsTitle')[0].dataset.id,
        commentId: this.dataset.commentId
    }, function (data) {
        toastr.success('提交成功');
    })
});

var comment = function (content, replyId) {
    post('/comment-rest/create', {
        postsId: $('#postsTitle')[0].dataset.id,
        content: content,
        replyId: replyId
    }, function (data) {
        location.reload()
    })
};

$('#deleteBtn').on('click', function () {
    post('/posts-rest/delete/' + $('#postsTitle')[0].dataset.id, {}, function (data) {
        toastr.success("删除成功");
        location.href = '/';
    })
});

var postsApprovalBtn = $('#postsApprovalBtn');
postsApprovalBtn.on('click', function () {
    if (this.dataset.toggle) {
        return;
    }
    if (postsApprovalBtn.attr('class') === 'custom-font-color') {
        post('/approval-rest/delete/' + $('#postsTitle')[0].dataset.id, {}, function (data) {
            toastr.success('取消'+ postsApprovalBtn.attr('title') +'成功');
            postsApprovalBtn.attr('class', '');
            $('#postsApprovalNumber').html(data);
        });
    } else {
        post('/approval-rest/create/' + $('#postsTitle')[0].dataset.id, {}, function (data) {
            toastr.success(postsApprovalBtn.attr('title') + "成功");
            postsApprovalBtn.attr('class', 'custom-font-color');
            $('#postsApprovalNumber').html(data);
        });
    }
});