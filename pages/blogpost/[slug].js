import React, { useState } from 'react'
import styles from '../../styles/Home.module.css'
const fs = require('fs')

//step 1: find the file corresponding to the slug
//step 2 : Populate them inside the page 

const Slug = (props) => {

    function createMarkup(BlogContent) {
        return { __html: BlogContent };
    }
    

    const [Blog, setBlog] = useState(props.myBlog);

    // useEffect(() => {
    //     if (!router.isReady) return
    //     const { slug } = router.query; ////slug means jo bhi router query ke andar value rhegi wo 
    //     fetch(`http://localhost:3000/api/getblog?slug=${slug}`).then((response) => {
    //         return response.json()
    //             .then((parsedData) => {
    //                 console.log(parsedData)
    //                 setBlog(parsedData);
    //             })
    //     })
    // }, [router.isReady])

    return (
        <main className={styles.main}>
            <h1>Title of the page : {Blog && Blog.title}</h1>
            <hr />
            <div className={styles.container}>{Blog && <div dangerouslySetInnerHTML={createMarkup(Blog.Content)}></div>}</div>
        </main>
    )
}


//getStaticPaths
export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'how-to-learn-flask' } },
            { params: { slug: 'how-to-learn-JavaScript' } },
            { params: { slug: 'how-to-learn-NextJs' } },
        ],
        fallback: true, // can also be true or 'blocking'
    }
}

//ye funtion isly dale kyuki SSR me har request pe milega alag blog but isme apneko build krna hai isly ek satj jo bi blog hai sabke path de dege
//ki le bhia and kuch bhi request mange isme sed dedena //

//getStaticProps
export async function getStaticProps(context) {
    {/*isme jab apun ye page pe aate hai means ki slug pe then apneko slug ka value context me ajata(jo apenko blogpe click krke mila) hai ye function fire honepe */ }
    console.log(context.params)
    const { slug } = context.params;
    let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')


    // let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`); {/* isme hume slug ka value mlega jo blog.js page se ara hai wo hum leke jayge getblog api me &waha se value mlega*/ }
    // let myBlog = await data.json()
    return {
        props: { myBlog: JSON.parse(myBlog) }, // will be passed to the page component as props
    }
}


// export async function getServerSideProps(context) {
//     const { slug } =context.query;
//     let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);          {/* isme hume slug ka value mlega jo blog.js page se ara hai wo hum leke jayge getblog api me &waha se value mlega*/ }
//     let myBlog = await data.json()
//     return {
//         props: {myBlog}, // will be passed to the page component as props
//     }
// }



//ky hota hai ki apna client(browser) javascript ke madat se api request marke data lata hai populate kene
// ko jab render hojata hai page uske bad but SSR ky krta hai ki bhai tu mat kr mai krluga request wagera sab aur server side me 
// kruga ye sab kaam and jaise hi render hoga uske sath hi populate krduga tere request,this improves SEO

export default Slug;