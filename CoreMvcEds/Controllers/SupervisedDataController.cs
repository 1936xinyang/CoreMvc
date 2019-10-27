using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreMvcEds.Models;
using Microsoft.AspNetCore.Mvc;

namespace CoreMvcEds.Controllers
{
    public class SupervisedDataController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Detail()
        {
            InspectItemModel model = new InspectItemModel { InspectName="质量检查", Files= "/1.jpg,/2.jpg,/3.jpg" };
            return View(model);
        }

        public IActionResult Template()
        {
            UserViewModel model = new UserViewModel {  
                Age = 23,  
                Name="mike" ,
                Birthday=DateTime.Now,
                Sex=true
            };
            return View(model);
        }

        public IActionResult EditTmp()
        {
            UserViewModel model = new UserViewModel
            {
                Age = 23,
                Name = "mike",
                Birthday = DateTime.Now,
                Sex = true,
                YesOrNo = true,
                role=Role.admin
            };
            return View(model);
        }
    }
}