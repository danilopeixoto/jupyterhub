const SCOPES_ALL = "ALL"

export const parseScopes = (scopeList) => {
    /*
    Parses scopes and filters in something akin to JSON style

    For instance, scope list ["users", "groups!group=foo", "servers!server=user/bar", "servers!server=user/baz"]
    would lead to scope model
    {
       "users":scope.ALL,
       "admin:users":{
          "user":[
             "alice"
          ]
       },
       "servers":{
          "server":[
             "user/bar",
             "user/baz"
          ]
       }
    }
    */

    const parsedScopes = {};
    
    for (const scope of scopeList) {
        const [baseScope, filter] = scope.split("!");
        if (!filter) {
            parsedScopes[baseScope] = SCOPES_ALL;
        } else if (!parsedScopes[baseScope]) {
            parsedScopes[baseScope] = {};
        }
    
        if (parsedScopes[baseScope] !== SCOPES_ALL) {
            const [key, value] = filter.split("=");
            if (!parsedScopes[baseScope][key]) {
                parsedScopes[baseScope][key] = new Set([value]);
            } else {
                parsedScopes[baseScope][key].add(value);
            }
        }
    }
    
    return parsedScopes;
}


export const check_scope_access = (user, requiredScope, resources) => {

}
