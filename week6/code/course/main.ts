// node连接，用web socket连接
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import '@polkadot/api-augment';
import type { FrameSystemAccountInfo } from "@polkadot/types/lookup";
import { KeyringPair} from "@polkadot/keyring/types"
// import { providers, types } from "web3";
import { metadata } from "@polkadot/types/interfaces/essentials";
import { Option } from "@polkadot/types";

const sleep =(ms: number)=>new Promise(r =>setTimeout(r,ms))
// 连接地址
const WEB_SOCKET='ws://127.0.0.1:9944';
// 连接方法
const connect = async () =>{
    const wsProvider = new WsProvider(WEB_SOCKET);
    const api = await ApiPromise.create({provider:wsProvider,types:{}});
    await api.isReady;
    return api;
}
// 取常量
// const getConst = async (api:ApiPromise) =>{
//     // 当一个account至少需要这么多金额时，才能够存在，当account的金额过小时会从这个系统remove掉
//     const existentialDeposit = await api.consts.balances.existentialDeposit.toHuman();
//     return existentialDeposit;
// }

// 取变量，最多使用的变量是balance
// free表示可以自由转移,还需要账号参数，指明取哪一个账号的余额
// const getFreeBalance = async (api: ApiPromise,address: string) =>{
//     // 并导入相应的包
//     // import '@polkadot/api-augment'
//     // import type { FrameSystemAccountInfo } from "@polkadot/types/lookup";
//     const {data: {free, } ,}: FrameSystemAccountInfo = await api.query.system.account(address);
//     return free;
// }

// transfer交易,交易需要签名，所以是KeyringPair，bob是目标地址
// const transfer = async(api:ApiPromise,alice:KeyringPair,bob:string,amount:number)=>{
//     await api.tx.balances.transfer(bob,amount)
//     .signAndSend(alice,res=>{
//         console.log(`Tx status: ${res.status}`);
//     });
// }

// 获取metadate，定义async方法
// const getMatdate = async(api:ApiPromise) =>{
//     const metadate = api.rpc.state.getMetadata();
//     return (await metadate).toString();
// }

// 订阅balance的变化
// const subscribe = async(api:ApiPromise,address:string)=>{
//     await api.query.system.account(address,aliceInfo=>{
//         const free=aliceInfo.data.free
//         console.log('free balance is:',free.toHuman());
//     })

// }

const subscribeSomthing = async(api:ApiPromise)=>{
    await api.query.templateModule.something((res:number)=>{
                console.log(`somthing: ${res}`);
    })
}

const subscribe = async(api:ApiPromise)=>{
    await api.query.system.events(events=>{
        // 下面写对event的操作
        // event是一个列表
        // 遍历操作
        
        events.forEach(function(event){
            console.log('index',event['event']['index'].toHuman());
            console.log('data',event['event']['data'].toHuman());
        } );
    });
}

// 订阅event，不绑定在任何账号下
// const subscribe = async(api:ApiPromise)=>{
//     await api.query.system.events(events=>{
//         // 下面写对event的操作
//         // event是一个列表
//         // 遍历操作
        
//         events.forEach(function(event){
//             console.log('index',event['event']['index'].toHuman());
//             console.log('data',event['event']['data'].toHuman());
//         } );
//     });
// }
const main = async() =>{
    // 调用连接方法
    const api = await connect();
    // 常量
    // const deposit = await getConst(api);
    // console.log("deposit is",deposit);

    //变量 
    // 先导入地址，选择alice地址作为account，地址的导入通过Keyring
    // const keyring = new Keyring({type:'sr25519'});
    // const alice = keyring.addFromUri('//Alice');

    // const free = await getFreeBalance(api,alice.address);
    // console.log("deposit is",free.toHuman());

    // transfer
    // const keyring = new Keyring({type:'sr25519'});
    // const alice = keyring.addFromUri('//Alice');
    // const bob = keyring.addFromUri('//Bob');

    // // 查看bob的余额
    // const bob_balance = await getFreeBalance(api,bob.address);
    // console.log("bob_balance is",bob_balance.toHuman());

    // // 调用转账
    // await transfer(api,alice,bob.address,10**10+1);

    // // 等待链上交易打包，先睡眠,sleep定义在前面
    // await sleep (10000);

    // // 再次查询
    // const bob_balance_after = await getFreeBalance(api,bob.address);
    // console.log("bob_balance_after is",bob_balance_after.toHuman());

    // 获取metadate
    // const keyring = new Keyring({type:'sr25519'});
    // const alice = keyring.addFromUri('//Alice');
    // const bob = keyring.addFromUri('//Bob');

    // console.log('metadate is:',await getMatdate(api));

    // 订阅balance的变化
    // const keyring = new Keyring({type:'sr25519'});
    // const alice = keyring.addFromUri('//Alice');
    // await subscribe(api,alice.address);
    // await sleep(80000);

    const keyring = new Keyring({type:'sr25519'});
    const alice = keyring.addFromUri('//Alice');

    await subscribeSomthing(api);
    await subscribe(api);
    await sleep(80000);

    // 订阅event事件
    // const keyring = new Keyring({type:'sr25519'});
    // const alice = keyring.addFromUri('//Alice');
    // await subscribe(api);
    // await sleep(80000);

    console.log('main function');
}

main()
.then(() => {
//正常执行时
console.log('exit with success');
process.exit(0)
})
.catch(err =>{
    //错误执行时
    console.log('error is',err);
    process.exit(1);
})

