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
                callback(new Error(error.responseJSON.msg));
            }
        });
    },

    autoRedirect: function() {
        var token = $.cookie('token');
        if (token) {
          window.location.href = '/static/index.html';
        }
    },

    getModuleList: function(callback) {
        $.ajax({
            type: 'GET',
            url: '/api/modules',
            dataType: 'json',
            contentType: 'application/json',
            headers: {token: $.cookie('token')},
            success: function(result) {
                if (result.ret === false) {
                    callback(new Error(result.msg));
                } else {
                    callback(undefined, result);
                }
            },
            error: function(error) {
                callback(new Error(error.responseJSON.msg));
            }
        });
    },


    getProjectList: function(callback) {
        $.ajax({
            type: 'GET',
            url: '/api/projects',
            dataType: 'json',
            contentType: 'application/json',
            headers: {token: $.cookie('token')},
            success: function(result) {
                if (result.ret === false) {
                    callback(new Error(result.msg));
                } else {
                    callback(undefined, result);
                }
            },
            error: function(error) {
                callback(new Error(error.responseJSON.msg));
            }
        });
    },

    getProject: function(projectId, callback) {
        $.ajax({
            type: 'GET',
            url: '/api/projects/' + projectId,
            dataType: 'json',
            contentType: 'application/json',
            headers: {token: $.cookie('token')},
            success: function(result) {
                if (result.ret === false) {
                    callback(new Error(result.msg));
                } else {
                    callback(undefined, result);
                }
            },
            error: function(error) {
                callback(new Error(error.responseJSON.msg));
            }
        });
    },


    updateScript: function(projectId, script, callback) {
        $.ajax({
            type: 'POST',
            url: '/api/projects/' + projectId + '/properties/script',
            dataType: 'json',
            contentType: 'application/json',
            headers: {token: $.cookie('token')},
            data: JSON.stringify({script: script}),
            success: function(result) {
                if (result.ret === false) {
                    callback(new Error(result.msg));
                } else {
                    callback(undefined, result);
                }
            },
            error: function(error) {
                callback(new Error(error.responseJSON.msg));
            }
        });
    },

    setProjectStatus: function(projectId, status, callback) {
        $.ajax({
            type: 'PUT',
            url: '/api/projects/' + projectId + '/properties/status',
            dataType: 'json',
            contentType: 'application/json',
            headers: {token: $.cookie('token')},
            data: JSON.stringify({status: status}),
            success: function(result) {
                if (result.ret === false) {
                    callback(new Error(result.msg));
                } else {
                    callback(undefined, result);
                }
            },
            error: function(error) {
                callback(new Error(error.responseJSON.msg));
            }
        });
    },


    createProject: function(project, callback) {
        $.ajax({
            type: 'POST',
            url: '/api/projects',
            dataType: 'json',
            contentType: 'application/json',
            headers: {token: $.cookie('token')},
            data: JSON.stringify(project),
            success: function(result) {
                if (result.ret === false) {
                    callback(new Error(result.msg));
                } else {
                    callback(undefined, result);
                }
            },
            error: function(error) {
                callback(new Error(error.responseJSON.msg));
            }
        });
    },

    projectDebug: function(projectId, script, method, url, params, callback) {
        $.ajax({
            type: 'POST',
            url: '/api/projects/' + projectId + '/debug',
            dataType: 'json',
            contentType: 'application/json',
            headers: {token: $.cookie('token')},
            data: JSON.stringify({script: script, method: method, url: url, params: params}),
            success: function(result) {
                if (result.ret === false) {
                    callback(new Error(result.msg));
                } else {
                    callback(undefined, result);
                }
            },
            error: function(error) {
                callback(new Error(error.responseJSON.msg));
            }
        });
    },

    //http://localhost:8080?a=a1&b=b1
    getParams: function(url) {
        if (url.indexOf('?') < 0) {
            return {};
        }
        var result = {};
        var paramString = url.substring(url.indexOf('?') + 1, url.length);
        var pairs = paramString.split('&');
        for (var i = 0; i < pairs.length; i ++) {
            var p = pairs[i].split('=');
            result[p[0]] = p[1];
        }
        return result;
    },

    _check_token_error: function(result) {
        
    }
}