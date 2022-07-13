## General Note

Don't deploy this publicly without securing it

## Getting Started

1. Create a `.env` file, and fill it out following the example of `.env.sample`
 - You will need a personal access token from GitHub
 - Be sure to give your token full access to repos, and full read access to notifications and user stuff
 
2. `npm i`

3. `npm start`

> Note: A cache file is created on build using fresh data from GitHub, and all data is pulled from the cache file. The cache file remains until manually deleted, so be sure to remove it before a build for fresh data. 


## Development Scripts

**`npm start`**

> Run 11ty with hot reload at localhost:8080, including reload based on Sass changes

**`npm run build`**

> Production build includes minified, autoprefixed CSS

Use this as the "Publish command" if needed by hosting such as Netlify.

## Resources to extend this and learn 11ty

**Ensure accessible colors** by adding my [a11y-color-tokens package](https://www.npmjs.com/package/a11y-color-tokens)

**Learn to build an 11ty site in 20 mins** with my [egghead video course](https://5t3ph.dev/learn-11ty) and see how to add a blog and custom data.

**Add auto-generated social media images** with [my plugin](https://www.npmjs.com/package/@11tyrocks/eleventy-plugin-social-images)

**Explore advanced setup of custom data** through my [tutorial on building a community site](https://css-tricks.com/a-community-driven-site-with-eleventy-building-the-site/)

**For a more full-featured starter** check out my [11ty Netlify Jumpstart](https://11ty-netlify-jumpstart.netlify.app/) (also works for hosts other than Netlify).


## Credits
 - 11ty Sass Skeleton - Created by [@5t3ph](https://twitter.com/5t3ph)
