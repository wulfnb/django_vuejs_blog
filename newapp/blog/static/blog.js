const app = new Vue({
    el: '#app',

    delimiters: ["<%", "%>"],

    data: {
        blog_posts : [],
        title: '',
        description: '',
        logged_in : false,
        token: '',
        list_data: true,
        add_blog: false
    },

    computed: {
    },
    mounted() {
        this.login()
        // this.getBlogs()
    },
    created() {
    },
    methods: {

        getBlogs() {
                fetch('/blog/blog/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Token ${this.token}`
                    },
                }).then(response => {
                        return response.json()
                }).then(json => {
                    this.blog_posts = json
                })

        },

        login() {
            var login_credintials = {
                "username" : "admin",
                "password" : "admin123"
            }
            fetch('/api-token-auth/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login_credintials)
            }).then(response => {
                    return response.json()
                }).then(json => {
                    console.log(json)
                    // this.token = "Token ".concat(json.token)
                    this.token = json.token
            })
        },

        saveBlog() {
            if (this.title && this.description){
                var post_data = {
                    "title": this.title,
                    "description": this.description,
                    "author": 1
                }
                fetch('/blog/blog/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Token ${this.token}`
                    },
                    body: JSON.stringify(post_data)
                }).then(response => {
                    return response.json()
                }).then(json => {
                    // console.log(json)
                    // this.token = "Token ".concat(json.token)
                    this.title = ''
                    this.description = ''
                    alert('data saved successfully')
                })
            }
            else{
                alert('Title and description is required')
            }
        },

        delBlog(id) {
            fetch('/blog/blog/'+id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${this.token}`
                },
            }).then(response => {
                alert('Delete successfull')
                this.getBlogs()
            })

        },

    }
})
