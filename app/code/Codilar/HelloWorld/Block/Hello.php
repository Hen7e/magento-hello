<?php
declare(strict_types=1);

namespace Codilar\HelloWorld\Block;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\View\Element\Template;
use Magento\Customer\Model\Session;
use Magento\Framework\View\Element\Template\Context;
use Codilar\HelloWorld\Model\ResourceModel\Post\Collection;

class Hello extends Template
{
    private Session $customerSession;

    private Collection $postCollection;

    /**
     * Hello constructor.
     * @param Context $context
     * @param Session $customerSession
     * @param Collection $postCollection
     */
    public function __construct(
        Context $context,
        Session $customerSession,
        Collection $postCollection
    ) {
        parent::__construct($context);
        $this->customerSession = $customerSession;
        $this->postCollection = $postCollection;
    }

    public function getText(): string
    {
        return "Hello World";
    }

    /**
     * @throws LocalizedException
     */
    public function getUser(): string
    {
        $customer = $this->customerSession->getCustomer();
        $isLoggedIn = $this->customerSession->isLoggedIn();
        if ($isLoggedIn) {
            return "Name: " . $customer->getName();
        } else {
            return  "Пользователь не зашёл в систему";
        }
    }

    /**
     * @throws LocalizedException
     */
    public function getPosts(): string
    {
        $customer = $this->customerSession->getCustomer();
        $isLoggedIn = $this->customerSession->isLoggedIn();
        if ($isLoggedIn) {
            $collection = $this->postCollection->addFieldToFilter('entity_id', $customer->getId())->addFieldToSelect('content');
            $content = '';
            foreach($collection as $item){
                $content = $content . ' Post = ' . implode(' ', $item->getData()) . ',';
            }
            return $content;
        } else {
            return 'No posts';
        }
    }
}
