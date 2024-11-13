import { app, shell, BrowserWindow ,ipcMain} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import store from './store'

const onLoginOrRegister=(callback)=>{

    ipcMain.on("loginOrRegister",(e,isLogin)=>{
        console.log("主进程收到消息",isLogin);
        callback(isLogin)
      })
}

const onLoginSuccess=(callback)=>{
    ipcMain.on("openChat",(e,config)=>{

        store.initUserId(config.userId)
        store.setUserData("token",config.token)
        //TODO 增加用户配置
 
        callback(config)

        //TODO 初始化websocket连接
      })

}

export{
    onLoginOrRegister,onLoginSuccess
}

