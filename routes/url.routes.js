import {Router} from 'express'
const router=Router();
import { generateNewShortURL,getAnalytics } from '../controllers/url.controllers.js'

router.route("/generateId").post(generateNewShortURL)
router.route('/analytics/:shortId').get(getAnalytics)
export default router