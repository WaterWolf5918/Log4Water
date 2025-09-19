import { Logger } from "./index"
const logger = new Logger('test.ts')
logger.templateLog("TemplateLog (shouldn't really be used)","Single Line Test")
logger.templateLog("TemplateLog (shouldn't really be used)","Multiple Line Test\nLine 1\nLine 2")

logger.info("Single Line Test")
logger.info("Multiple Line Test\nLine 1\nLine 2")

logger.warn("Single Line Test")
logger.warn("Multiple Line Test\nLine 1\nLine 2")

logger.error("Single Line Test")
logger.error("Multiple Line Test\nLine 1\nLine 2")



logger.info("Testing Debug Printing")

logger.warn(`There should be no debug lines below\nDisplay Debug: ${logger.displayDebugMessage}`)
logger.dinfo("Single Line Test")
logger.dinfo("Multiple Line Test\nLine 1\nLine 2")
logger.info("Enabling Debug Logging")
logger.displayDebugMessage = true;
logger.warn(`There should now be debug lines below\nDisplay Debug: ${logger.displayDebugMessage}`)
logger.dinfo("Single Line Test")
logger.dinfo("Multiple Line Test\nLine 1\nLine 2")







logger.fatal("Multiple lines really don't matter since this is going to crash the app anyways :3")

// logger.templateLog("status","Line1\nLine2\nLines3")

