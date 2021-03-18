const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { expect, should } = require('chai');
const ERC20 = artifacts.require('ERC20Token');

contract('ERC20 Token', function (accounts) {
  const _name = 'ALYRA';
  const _symbol = 'ALY';
  const _decimals = new BN(18);
  const _supply = new BN(1000);

  const owner = accounts[0];
  const recipient = accounts[1];

  // Avant chaque test unitaire
  beforeEach(async function () {
    this.ERC20Instance = await ERC20.new(_supply, {from: owner});
    //let accounts = await web3.eth.getAccounts();
  });

  // Premier test unitaire
  it('a un nom', async function () {
    expect(await this.ERC20Instance.name()).to.equal(_name);
  });

  // Deuxième test unitaire
  it('a un symbole', async function () {
    expect(await this.ERC20Instance.symbol()).to.equal(_symbol);
  });

  // Troisième test unitaire
  it('a un decimals', async function () {
    let expected = (await this.ERC20Instance.decimals()).toString();
    expect(expected).to.equal(_decimals.toString());
  });

  // 4eme test unitaire
  it('a un supply', async function () {
    let expected = (await this.ERC20Instance.totalSupply()).toString();
    expect(expected).to.equal(_supply.toString());
  });

  // 
  it('transfert des tokens', async function () {
    let actualBalanceOwner = await this.ERC20Instance.balanceOf(owner);
    let actualBalanceRecipient = await this.ERC20Instance.balanceOf(recipient);
    let value = new BN(10);

    await this.ERC20Instance.transfer(recipient, value, {from: owner});
    
    let newBalanceOwner = await this.ERC20Instance.balanceOf(owner);
    let convertedValueOwner = (actualBalanceOwner.sub(value)).toString();

    let newBalanceRecipient = await this.ERC20Instance.balanceOf(recipient);
    let convertedValueRecipient = (actualBalanceRecipient.add(value)).toString();


    expect(newBalanceOwner.toString()).to.equal(convertedValueOwner);
    expect(newBalanceRecipient.toString()).to.equal(convertedValueRecipient);
  });

  it('transfert des tokens avec to.be.bignumber.equal', async function () {
    let actualBalanceOwner = await this.ERC20Instance.balanceOf(owner);
    let actualBalanceRecipient = await this.ERC20Instance.balanceOf(recipient);
    let value = new BN(10);

    await this.ERC20Instance.transfer(recipient, value, {from: owner});
    
    let newBalanceOwner = await this.ERC20Instance.balanceOf(owner);
    let newBalanceRecipient = await this.ERC20Instance.balanceOf(recipient);


    expect(newBalanceOwner).to.be.bignumber.equal(actualBalanceOwner.sub(value));
    expect(newBalanceRecipient).to.be.bignumber.equal(actualBalanceRecipient.add(value));
  });
});
