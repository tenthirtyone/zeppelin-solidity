pragma solidity ^0.4.18;

/**
 * @title Weighted interface
 */
contract Weighted {
  event AddWeight(address indexed _to, uint256 _weight);
  event RemoveWeight(address indexed _to, uint256 _weight);

  function assetCount(address _owner) public view returns (uint256);
  function totalWeight() public view returns (uint256);

}
