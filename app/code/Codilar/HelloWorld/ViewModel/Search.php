<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

namespace Codilar\HelloWorld\ViewModel;

use Magento\Catalog\Model\Session as CatalogSession;
use Magento\Directory\Helper\Data as DataHelper;
use Magento\Customer\Helper\Address as AddressHelper;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\ResponseInterface;
use Magento\Catalog\Model\ProductRepository;

/**
 * Custom address view model
 */
class Search implements ArgumentInterface
{
    /**
     * @var CatalogSession
     */
    private $catalogSession;

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * Constructor
     *
     * @param RequestInterface $request
     * @param ProductRepository $productRepository
     */
    public function __construct(
        RequestInterface $request,
        ProductRepository $productRepository
    )
    {
        $this->request = $request;
        $this->productRepository = $productRepository;
    }

    /**
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getProductBySku($sku)
    {
        $product = $this->productRepository->get($sku);
        return $product;
    }

    public function getProduct()
    {
        $sku = $this->request->getParam("sku");
        $product = $this->productRepository->get($sku);

        return $product;
    }

    public function HelloWorld()
    {
        return "HelloWorld";
    }
}
