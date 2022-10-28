import Layout from '/components/Layout';
import ResourceHighlight from '/components/ResourceHighlight'
import Newsletter from '/components/Newsletter';
import ResourceList from '/components/ResourceList';
import Footer from "/components/Footer";
import { useEffect } from 'react';

export default function Home({resources}) {

  return (
      <Layout>
        <ResourceHighlight resources={resources.slice(0, 2)}/>
        <Newsletter />
        <ResourceList resources={resources}/>
        <Footer />
      </Layout>
  )
}

// Is called every time you visit the page
// function executed on the server
export async function getServerSideProps() {
  const resData = await fetch(`${process.env.API_URL}/resources`);
  const data = await resData.json();
  return {
    props: {
      resources: data
    }
  }
}

// is called at build time, only ONCE

// export async function getStaticProps() {
//   const resData = await fetch("http://localhost:3000/api/resources");
//   const data = await resData.json();
//   return {
//     props: {
//       resources: data
//     }
//   }
// }
