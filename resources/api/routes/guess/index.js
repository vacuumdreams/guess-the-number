import post from "./post"

export default (maxGuesses, storeService) => ({
  post: post(maxGuesses, storeService),
})
