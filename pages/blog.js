import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
const fs = require('fs')
// import blogdata from '../blogdata'


//step 1: collect all the files from blogdata directory
//step 2 : Iterate through them and display them
const Blog = (props) => {

  console.log(props)
  const [blogs, setblogs] = useState(props.allBlogs);
  console.log(blogs)

  // useEffect(() => {
  //   console.log("useEffect is running")
  //   //yaha hum apna api fetch krre hai api/blogs me jo humne banaya hai endppoint use krne ko 
  //   fetch('http://localhost:3000/api/blogs').then((response) => {
  //     return response.json()
  //       .then((parsedData) => {
  //         console.log(parsedData)
  //         setblogs(parsedData);
  //       })
  //   })
  // }, [])

  // we will not populate our content on client side via JS using useEffect here so we will use SSR to populate it on server side//


  return (
    <main className={styles.main}>
      <div className={styles.blogs}>
        {blogs.map((blogitem) => {
          return <div className={styles.blogItem} key={blogitem.slug}>
            <Link href={`/blogpost/${blogitem.slug}`}>    {/*ye line me apneko /blogpost/how-to-learn-flask and all sab milega then ye leke hum jayge blogpost folder me */}
              <h3>{blogitem.title}</h3></Link>
            <p>{blogitem.metadesc.substr(0, 140)}....</p>
          </div>
        })}
      </div>
    </main>
  )
}

// export async function getServerSideProps(context) {
//   let data = await fetch('http://localhost:3000/api/blogs')
//   let allBlogs = await data.json();

//   return {
//     props: { allBlogs }, // will be passed to the page component as props
//   }
// }



export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let myFile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myFile = await fs.promises.readFile(("blogdata/" + item), 'utf-8')
    allBlogs.push(JSON.parse(myFile));
  }
  return {
    props: { allBlogs }, // will be passed to the page component as props
  }
}




//ye jo props hai wo server side pe run krta hai //
//isme apun ye props me jo bhi dalege wo apne Component ko miljayga deko upar usne props as a agruement liya hai blog ne 
//ye jo above code hai isme apun props send krte hai apne page ka taki wo server side pe phele process hojaye and then we send it to our component 
//and then wo component jab click krege tab apene ko render hoke milega Html wgera sab , JS se nai krne pdega client side m 

export default Blog;