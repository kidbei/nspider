window.nspider = {
    login: function(userName, password, callback) {
        $.ajax({
            type: 'POST',
            url: '/api/login',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({userName: userName, password: password}),
            success: function(result) {
                if (result.ret === false) {
                    callback(new Error(result.msg));
                } else {
                    var token = result.data.token;
                    // $.cookie('token', token, {path: '/'});
                    callback(undefined, token);
                }
            },
            error: function(error) {
                callback(error);
            }
        });
    },

    autoRedirect: function() {
        var token = $.cookie('token');
        if (token) {
          window.location.href = '/static/index.html';
        }
    },

    _check_token_error: function(result) {
        
    }
}