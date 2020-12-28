import {match} from '../aprMatcher';

describe('the regex matcher', ()=>{

  it('should return null if the there is no numbers', ()=>{
    const input = 'abc';
    expect(match(input)).toBeNull();
  });

  it('should return null if there is no % sign attched in the end', ()=>{
    const input = "88.90";
    expect(match(input)).toBeNull();
  });

  it('should return correct number if there is no % sign attched in the end', ()=>{
    const input = "88.90% adganc";
    expect(match(input)).toEqual(['88.90%']);
  });

  it('should return correct number if there is no % sign attched in the end', ()=>{
    const input = "APY:0.70%\\n+20.43% MTA\\n+2.01%\\nto 5.02%  CRV";
    expect(match(input)).toEqual(['0.70%', '20.43%', '2.01%', '5.02%']);
  });
});