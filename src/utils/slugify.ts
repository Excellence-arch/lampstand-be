import slugify from 'slugify';
import Post from '../models/post.model';

async function generateUniqueSlug(title: string) {
  // Initial slug creation from the title
  let baseSlug = slugify(title, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Check the database for an existing slug
  while (await Post.findOne({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

export default generateUniqueSlug;
