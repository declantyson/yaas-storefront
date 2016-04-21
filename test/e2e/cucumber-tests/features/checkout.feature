Feature: Checkout

  Scenario Outline: Successful checkout
    Given the user has a "Budget Kebab" in their cart
    And the user has entered their shipping and billing details
      | First Name   | Last Name   | Email   | Country   | Address   | City   | Postal Code   |
      | <First Name> | <Last Name> | <Email> | <Country> | <Address> | <City> | <Postal Code> |
    When the user enters valid card details
      | Card Number   | Month   | Year   | CVC   |
      | <Card Number> | <Month> | <Year> | <CVC> |
    And the user clicks Place Order
    Then the order confirmation page is displayed
    And the order is stored successfully in Hybris
    And the order is stored correctly in Worldpay
    Examples:
      | First Name | Last Name | Email         | Country        | Address         | City   | Postal Code | Card Number      | Month | Year | CVC |
      | Fake       | Guy       | test@ypay.com | United Kingdom | 123 Fake Street | London | QQ1 1QQ     | 4444333322221111 | 01    | 2022 | 123 |



