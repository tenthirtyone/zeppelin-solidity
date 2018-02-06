import assertRevert from '../helpers/assertRevert';
const BigNumber = web3.BigNumber;
const ERC721Token = artifacts.require('ERC721TokenMock.sol');
const Association = artifacts.require('AssociationMock.sol');

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('ERC721Token', accounts => {
  let token = null;
  let dao = null;

  const _firstTokenId = 1;
  const _secondTokenId = 2;

  const _creator = accounts[0];
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

  beforeEach(async function () {
    token = await ERC721Token.new({ from: _creator });
    dao = await Association.new(token.address, 10, 0, { from: _creator });

    await token.mint(_creator, _firstTokenId, { from: _creator });
    await token.mint(_creator, _secondTokenId, { from: _creator });
  });

  describe('Its a DAO!', function () {
    it('DAO shareholder address matches token address', async function () {
      const sharesAddress = await dao.sharesTokenAddress();
      const tokenAddress = token.address;

      tokenAddress.should.be.equal(sharesAddress);
    });
    it('Creates a new proposal', async function () {
      const { logs } = await dao.newProposal(ZERO_ADDRESS, 0, 'Test Proposal', '', { from: _creator });

      logs.length.should.be.equal(1);
      logs[0].event.should.be.eq('ProposalAdded');
      logs[0].args.recipient.should.be.equal(ZERO_ADDRESS);
      logs[0].args.amount.should.be.bignumber.equal(0);
      logs[0].args.description.should.be.equal('Test Proposal');
    });
    it('Votes on the proposal', async function () {
      await dao.newProposal(ZERO_ADDRESS, 0, 'Test Proposal', '', { from: _creator });
      await dao.vote(0, true, { from: _creator });
    });
    it('Executes the proposal', async function () {
      await dao.newProposal(ZERO_ADDRESS, 0, 'Test Proposal', '', { from: _creator });
      await dao.vote(0, true, { from: _creator });
      await dao.executeProposal(0, '', { from: _creator });
    });
  });
});
