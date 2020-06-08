const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const totalAmount = blogs.reduce((allLikes, blog) => {
        return allLikes + blog.likes
    }, 0)
    return totalAmount 
}

const favoriteBlog = (blogs) => {
    const blogWithMostLikes = blogs.reduce((blogWithLikes, blog) => {
        biggerAmountOfLikes = Math.max(blogWithLikes.likes, blog.likes)
        return blogWithLikes.likes === biggerAmountOfLikes ? blogWithLikes : blog
    }, { likes : 0})

    return { title: blogWithMostLikes.title, author: blogWithMostLikes.author, likes: blogWithMostLikes.likes }
}

const mostBlogs = (blogs) => {
    let ArrayWithAuthors = []
    let NamesArray = []
    ArrayWithAuthors = (
        blogs.map(blog => {
            return blog.author
        })
    )
    
    const isUnique = (author) => {
        if(NamesArray.find(authorInArray => author == authorInArray)) {
            return false
        } else {
            NamesArray.push(author)
            return true
        }
    }
    
    NamesArray = ArrayWithAuthors.filter(author => {
        return isUnique(author)
    })
    
    let highestPerson = { author:'', blogs:0 }

    for (i=0;i<NamesArray.length;i++) {
        let howManyBlogs = 0;

        for(k=0;k<ArrayWithAuthors.length;k++) {
            if(NamesArray[i] === ArrayWithAuthors[k]) {
                howManyBlogs++
            }
        }
        if(howManyBlogs>highestPerson.blogs){
            highestPerson = { author: NamesArray[i], blogs:howManyBlogs }
        }


    }
    return(highestPerson)
}

const mostLikes = (blogs) => {
    let NamesArray = []
    let ArrayWithAuthors = (
        blogs.map(blog => {
            return blog.author
        })
    )
    
    const isUnique = (author) => {
        if(NamesArray.find(authorInArray => author == authorInArray)) {
            return false
        } else {
            NamesArray.push(author)
            return true
        }
    }

    NamesArray = ArrayWithAuthors.filter(author => {
        return isUnique(author)
    })

    let highestPerson = { author:'', likes:0 }

    for (i=0;i<NamesArray.length;i++) {
        let howManyLikes = 0;

        for(k=0;k<ArrayWithAuthors.length;k++) {
            if(NamesArray[i] === ArrayWithAuthors[k]) {
                howManyLikes += blogs[k].likes;
            }
        }
        if(howManyLikes>highestPerson.likes){
            highestPerson = { author: NamesArray[i], likes:howManyLikes }
        }
    }
    return(highestPerson)

}



module.exports = { 
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}