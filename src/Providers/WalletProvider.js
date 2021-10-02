Moralis.enable = async () =>
{
    const web3Provider = new MoralisTorusProvider();
    const web3 = await web3Provider.activate();
    return web3;
}