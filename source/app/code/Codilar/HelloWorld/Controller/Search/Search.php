<?php
declare(strict_types=1);

namespace Codilar\HelloWorld\Controller\Search;

//use Magento\Backend\Model\View\Result\RedirectFactory;
use Magento\Framework\Controller\Result\Redirect;
use Magento\Framework\Controller\Result\RedirectFactory;
//use Magento\Framework\Controller\Result\RedirectFactory;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\ResponseInterface;
use Magento\Catalog\Model\ProductRepository;
//use Magento\Framework\View\Result\PageFactory;
//use Magento\Catalog\Model\Session;
use Magento\Customer\Model\Session;
use Magento\Framework\Stdlib\Cookie\CookieMetadataFactory;
use Magento\Framework\Stdlib\CookieManagerInterface;

class Search implements HttpGetActionInterface
{
    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * @var Session
     */
    private $catalogSession;

    /**
     * @var Redirect
     */
    private $resultRedirect;

    /**
     * @var RedirectFactory
     */
    private $redirectFactory;


    /**
     * @param RequestInterface $request
     * @param ProductRepository $productRepository
     * @param Session $catalogSession
     * @param Redirect $resultRedirect
     * @param RedirectFactory $redirectFactory
     */
    public function __construct(
        RequestInterface $request,
        ProductRepository $productRepository,
        Session $catalogSession,
        Redirect $resultRedirect,
        RedirectFactory $redirectFactory
    )
    {
        $this->request = $request;
        $this->productRepository = $productRepository;
        $this->catalogSession = $catalogSession;
        $this->resultRedirect = $resultRedirect;
        $this->redirectFactory = $redirectFactory;

    }

    /**
     * Execute action based on request and return result
     *
     * Note: Request will be added as operation argument in future
     *
     * @throws \Magento\Framework\Exception\NotFoundException
     */
    public function execute()
    {
        $sku = $this->request->getParam("sku");
        $product = $this->productRepository->get($sku);

//        $this->catalogSession->setData("product", $product);

        return $this->redirectFactory->create()->setPath('smartautobrand');
//        return $this->redirectFactory->create()->setUrl('https://devdocs.magento.com/guides/v2.4/extension-dev-guide/routing.html');
    }
}
