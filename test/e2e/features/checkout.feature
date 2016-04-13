Feature: Checkout

#  Scenario Outline: Checkout Worldpay
#    Given the user has a "Budget Kebab" in their cart
#      And the user has entered their shipping and billing details
#      | First Name   | Last Name   | Email   | Country   | Address   | City   | Postal Code   |
#      | <First Name> | <Last Name> | <Email> | <Country> | <Address> | <City> | <Postal Code> |
#    When the user enters valid card details
#        | Card Number      | Month | Year | CVC |
#        | 4444333322221111 | 01    | 2022 | 123 |
#    And the user clicks Place Order
##    Then the order confirmation page is displayed
##      And the order is stored successfully in Hybris
##      And the order is stored correctly in Worldpay
#    Examples:
#      | First Name | Last Name | Email         | Country       | Address         | City   | Postal Code |
#      | Fake       | Guy       | test@ypay.com | United Kingdom | 123 Fake Street | London | QQ1 1QQ     |


  Scenario Outline: Checkout Vanilla
    Given the user has a "hybris Beer Mug" in their cart
      Given the user has entered their shipping and billing details
        | First Name   | Last Name   | Email   | Country   | Address   | City   | Postal Code   | State   |
        | <First Name> | <Last Name> | <Email> | <Country> | <Address> | <City> | <Postal Code> | <State> |
    When the user enters valid card details
      | Card Number      | Month | Year | CVC |
      | 4242424242424242 | 01    | 2022 | 123 |
      And the user clicks Place Order
    Then the order confirmation page is displayed
#      And the order is stored successfully in Hybris
#      And the order is stored correctly in Worldpay
    Examples:
      | First Name | Last Name | Email         | Country | Address         | City    | Postal Code | State |
      | Fake       | Guy       | test@ypay.com | Canada  | 123 Fake Street | Houston | 90210       | AB    |



