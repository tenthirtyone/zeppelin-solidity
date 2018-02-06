pragma solidity ^0.4.18;

import "../dao/Association.sol";

/**
 * @title ERC721TokenMock
 * This mock just provides a public mint and burn functions for testing purposes.
 */
contract AssociationMock is Association {
  function AssociationMock(
    Token sharesAddress,
    uint minimumSharesToPassAVote,
    uint minutesForDebate)
    Association(
      sharesAddress,
      minimumSharesToPassAVote,
      minutesForDebate
       ) public
       { }

}
